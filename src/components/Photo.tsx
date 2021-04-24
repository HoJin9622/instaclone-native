import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, VFC } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { seeFeed_seeFeed } from '../__generated__/seeFeed'

const Container = styled.View``
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`
const Username = styled.Text`
  color: white;
  font-weight: 600;
`
const File = styled.Image``
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`
const Caption = styled.View`
  flex-direction: row;
`
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`
const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`
const ExtraContainer = styled.View`
  padding: 10px;
`

const Photo: VFC<seeFeed_seeFeed> = ({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
}) => {
  const navigation = useNavigation()
  const { width, height } = useWindowDimensions()
  const [imageHeight, setImageHeight] = useState(height - 450)
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height / 10)
    })
  }, [file])

  return (
    <Container>
      <Header onPress={() => navigation.navigate('Profile')}>
        {user.avatar && (
          <UserAvatar resizeMode='cover' source={{ uri: user.avatar }} />
        )}
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode='cover'
        style={{
          width,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />

      <ExtraContainer>
        <Actions>
          <Action>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              color={isLiked ? 'tomato' : 'white'}
              size={22}
            />
          </Action>
          <Action onPress={() => navigation.navigate('Comments')}>
            <Ionicons name='chatbubble-outline' color='white' size={22} />
          </Action>
        </Actions>
        <TouchableOpacity onPress={() => navigation.navigate('Likes')}>
          <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  )
}

export default Photo

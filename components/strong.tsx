import React from "react"
import { Text } from "react-native"

export default function Strong(props: any) {
  return <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
}

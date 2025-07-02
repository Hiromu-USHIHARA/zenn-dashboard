import { Center, Stack, Loader, Text, Image } from '@mantine/core';
import reactLogo from '../assets/react.svg'; // 仮にreact.svgをロゴとして利用

export function LoadingSplash() {
  return (
    <Center h="100vh" w="100vw" style={{ flexDirection: 'column' }}>
      <Stack align="center" gap="md">
        <Image src={reactLogo} alt="ロゴ" width={80} height={80} radius="md" fit="contain"/>
        <Text size="xl" fw={700}>Zenn ダッシュボード</Text>
        <Loader color="blue" size="lg"/>
        <Text c="dimmed">読み込み中...</Text>
        <Text size="sm" c="dimmed" mt="md">※このページはZenn公式のものではありません</Text>
      </Stack>
    </Center>
  );
} 
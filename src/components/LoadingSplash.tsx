import { Center, Stack, Loader, Text, Image } from '@mantine/core';
import zennLogo from '../assets/react.svg'; // 仮にreact.svgをロゴとして利用

export function LoadingSplash() {
  return (
    <Center h="100vh" w="100vw" style={{ flexDirection: 'column' }}>
      <Stack align="center" gap="md">
        <Image src={zennLogo} alt="ロゴ" width={80} height={80} radius="md"/>
        <Text size="xl" fw={700}>Zenn ダッシュボード</Text>
        <Loader color="blue" size="lg"/>
        <Text c="dimmed">読み込み中...</Text>
      </Stack>
    </Center>
  );
} 
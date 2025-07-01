import { Card, Text, Group, Badge, Stack } from '@mantine/core';
import { IconHeart, IconBookmark, IconMessage } from '@tabler/icons-react';
import type { ZennArticle } from '../types/zenn';
import dayjs from 'dayjs';

interface ArticleCardProps {
  article: ZennArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY年MM月DD日');
  };

  const formatLettersCount = (count: number) => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}万字`;
    }
    return `${count}字`;
  };

  // Zenn記事のURLを生成
  const articleUrl = `https://zenn.dev${article.path}`;

  return (
    <a href={articleUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ cursor: 'pointer' }}>
        <Card.Section>
          <Group justify="space-between" p="md">
            <Group>
              {/* <Avatar src={article.user.avatar_small_url} size="sm" />
              <Text size="sm" c="dimmed">
                {article.user.name}
              </Text> */}
              <Text size="xl">{article.emoji}</Text>
            </Group>
            <Badge color={article.article_type === 'tech' ? 'blue' : 'green'}>
              {article.article_type === 'tech' ? '技術記事' : 'アイデア'}
            </Badge>
          </Group>
        </Card.Section>

        <Stack gap="xs">
          <Group>
            
            <Text fw={500} size="lg" lineClamp={2}>
              {article.title}
            </Text>
          </Group>

          <Group gap="xs" c="dimmed">
            <Group gap={4}>
              <IconHeart size={16} />
              <Text size="sm">{article.liked_count}</Text>
            </Group>
            <Group gap={4}>
              <IconBookmark size={16} />
              <Text size="sm">{article.bookmarked_count}</Text>
            </Group>
            <Group gap={4}>
              <IconMessage size={16} />
              <Text size="sm">{article.comments_count}</Text>
            </Group>
            <Text size="sm">•</Text>
            <Text size="sm">{formatLettersCount(article.body_letters_count)}</Text>
          </Group>

          <Text size="sm" c="dimmed">
            公開日: {formatDate(article.published_at)}
          </Text>

          {article.body_updated_at !== article.published_at && (
            <Text size="sm" c="dimmed">
              更新日: {formatDate(article.body_updated_at)}
            </Text>
          )}
        </Stack>
      </Card>
    </a>
  );
} 
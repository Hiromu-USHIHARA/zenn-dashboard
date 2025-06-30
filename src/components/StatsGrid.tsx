import { Grid, Paper, Text, Group } from '@mantine/core';
import { IconArticle, IconHeart, IconBookmark, IconMessage } from '@tabler/icons-react';
import type { ZennArticle } from '../types/zenn';

interface StatsGridProps {
  articles: ZennArticle[];
}

export function StatsGrid({ articles }: StatsGridProps) {
  const totalArticles = articles.length;
  const totalLikes = articles.reduce((sum, article) => sum + article.liked_count, 0);
  const totalBookmarks = articles.reduce((sum, article) => sum + article.bookmarked_count, 0);
  const totalComments = articles.reduce((sum, article) => sum + article.comments_count, 0);
  const totalLetters = articles.reduce((sum, article) => sum + article.body_letters_count, 0);

  const formatLettersCount = (count: number) => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}万字`;
    }
    return `${count.toLocaleString()}字`;
  };

  const stats = [
    {
      title: '記事数',
      value: totalArticles,
      icon: IconArticle,
      color: 'blue',
    },
    {
      title: '総いいね数',
      value: totalLikes.toLocaleString(),
      icon: IconHeart,
      color: 'red',
    },
    {
      title: '総ブックマーク数',
      value: totalBookmarks.toLocaleString(),
      icon: IconBookmark,
      color: 'yellow',
    },
    {
      title: '総コメント数',
      value: totalComments.toLocaleString(),
      icon: IconMessage,
      color: 'green',
    },
    {
      title: '総文字数',
      value: formatLettersCount(totalLetters),
      icon: IconArticle,
      color: 'grape',
    },
  ];

  return (
    <Grid>
      {stats.map((stat) => (
        <Grid.Col key={stat.title} span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
          <Paper p="md" radius="md" withBorder>
            <Group>
              <stat.icon size={24} color={`var(--mantine-color-${stat.color}-6)`} />
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  {stat.title}
                </Text>
                <Text fw={700} size="xl">
                  {stat.value}
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
} 
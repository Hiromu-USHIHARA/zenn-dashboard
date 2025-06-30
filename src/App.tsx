import { useState, useEffect, useMemo } from 'react';
import { Container, Title, Text, Stack, Grid, LoadingOverlay, Alert, Button, Group, Select } from '@mantine/core';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';
import { ArticleCard } from './components/ArticleCard';
import { StatsGrid } from './components/StatsGrid';
import { fetchZennArticles } from './services/zennApi';
import type { ZennArticle } from './types/zenn';

const sortOptions = [
  { value: 'new', label: '新着順' },
  { value: 'like', label: 'いいね数順' },
  { value: 'bookmark', label: 'ブックマーク数順' },
];

function App() {
  const [articles, setArticles] = useState<ZennArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState('new');
  const username = import.meta.env.VITE_ZENN_USER_NAME;

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchZennArticles(username);
      setArticles(data.articles);
    } catch (err) {
      setError('記事の取得に失敗しました。しばらく時間をおいてから再試行してください。');
      console.error('記事取得エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleRefresh = () => {
    fetchArticles();
  };

  // ソート済み記事リスト
  const sortedArticles = useMemo(() => {
    const copied = [...articles];
    switch (sort) {
      case 'like':
        return copied.sort((a, b) => b.liked_count - a.liked_count);
      case 'bookmark':
        return copied.sort((a, b) => b.bookmarked_count - a.bookmarked_count);
      case 'new':
      default:
        return copied.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    }
  }, [articles, sort]);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <div>
            <Title order={1} size="h2">
              Zenn ダッシュボード
            </Title>
            <Text c="dimmed" size="sm">
              @{username} の記事一覧
            </Text>
          </div>
          <Button
            leftSection={<IconRefresh size={16} />}
            onClick={handleRefresh}
            loading={loading}
            variant="light"
          >
            更新
          </Button>
        </Group>

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="エラー" color="red">
            {error}
          </Alert>
        )}

        <div style={{ position: 'relative' }}>
          <LoadingOverlay visible={loading} />
          
          {!loading && !error && (
            <>
              <Stack gap="lg">
                <div>
                  <Title order={2} size="h3" mb="md">
                    統計情報
                  </Title>
                  <StatsGrid articles={articles} />
                </div>

                <div>
                  <Group justify="space-between" align="end" mb="xs">
                    <Title order={2} size="h3">
                      記事一覧 ({articles.length}件)
                    </Title>
                    <Select
                      data={sortOptions}
                      value={sort}
                      onChange={(value) => setSort(value ?? 'new')}
                      label="ソート"
                      size="sm"
                      style={{ minWidth: 180 }}
                    />
                  </Group>
                  <Grid>
                    {sortedArticles.map((article) => (
                      <Grid.Col key={article.id} span={{ base: 12, md: 6, lg: 4 }}>
                        <ArticleCard article={article} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              </Stack>
            </>
          )}
        </div>
      </Stack>
    </Container>
  );
}

export default App;

import { useState, useEffect, useMemo, useRef } from 'react';
import { Container, Title, Text, Stack, Grid, LoadingOverlay, Alert, Button, Group, Select, Paper, Checkbox } from '@mantine/core';
import { IconAlertCircle, IconExternalLink, IconRefresh } from '@tabler/icons-react';
import { ArticleCard } from './components/ArticleCard';
import { StatsGrid } from './components/StatsGrid';
import { fetchZennArticles } from './services/zennApi';
import { LoadingSplash } from './components/LoadingSplash';
import type { ZennArticle } from './types/zenn';

const sortOptions = [
  { value: 'new', label: '新着' },
  { value: 'updated', label: '更新日' },
  { value: 'like', label: 'いいね数' },
  { value: 'bookmark', label: 'ブックマーク数' },
];

function App() {
  const [articles, setArticles] = useState<ZennArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState('new');
  const [showTech, setShowTech] = useState(true);
  const [showIdea, setShowIdea] = useState(true);
  const username = import.meta.env.VITE_ZENN_USER_NAME;
  const isFirstLoad = useRef(true);

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
      isFirstLoad.current = false;
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line
  }, []);

  const handleRefresh = () => {
    fetchArticles();
  };

  // フィルタリングとソート済み記事リスト
  const filteredAndSortedArticles = useMemo(() => {
    // フィルタリング
    let filtered = articles.filter(article => {
      if (article.article_type === 'tech' && !showTech) return false;
      if (article.article_type === 'idea' && !showIdea) return false;
      return true;
    });

    // ソート
    const copied = [...filtered];
    switch (sort) {
      case 'like':
        return copied.sort((a, b) => b.liked_count - a.liked_count);
      case 'bookmark':
        return copied.sort((a, b) => b.bookmarked_count - a.bookmarked_count);
      case 'updated':
        return copied.sort((a, b) => new Date(b.body_updated_at).getTime() - new Date(a.body_updated_at).getTime());
      case 'new':
      default:
        return copied.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    }
  }, [articles, sort, showTech, showIdea]);

  if (loading && isFirstLoad.current) {
    return <LoadingSplash />;
  }

  return (
    <Container size="xl" py="xl">
      <Paper shadow="sm" p="md" style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white', marginBottom: 32 }}>
        <Group justify="space-between" align="center">
          <div>
            <Title order={1} size="h2">
              Zenn ダッシュボード
            </Title>
            <Text c="dimmed" size="sm">
              <a href={`https://zenn.dev/${username}`} target="_blank" rel="noopener noreferrer">
                @{username}
              </a>{' '}
              の記事一覧
            </Text>
          </div>
          <Group>
            <Button
              component="a"
              href="https://zenn.dev/"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <IconExternalLink /> Zenn公式サイト
            </Button>
            <Button
              leftSection={<IconRefresh size={16} />}
              onClick={handleRefresh}
              loading={loading}
              variant="light"
            >
              更新
            </Button>
          </Group>
        </Group>
      </Paper>
      <Stack gap="xl">
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="エラー" color="red">
            {error}
          </Alert>
        )}

        <div style={{ position: 'relative' }}>
          <LoadingOverlay visible={loading && !isFirstLoad.current} />
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
                      記事一覧 ({filteredAndSortedArticles.length}件)
                    </Title>
                    <Group gap="md" align="end">
                      <Group gap="xs" align="end" style={{ height: '100%' }}>
                        <Checkbox
                          label="技術記事"
                          checked={showTech}
                          onChange={(event) => setShowTech(event.currentTarget.checked)}
                          size="md"
                          styles={{
                            label: {
                              backgroundColor: 'var(--mantine-color-blue-1)',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontWeight: 500
                            }
                          }}
                        />
                        <Checkbox
                          label="アイデア"
                          checked={showIdea}
                          onChange={(event) => setShowIdea(event.currentTarget.checked)}
                          size="md"
                          styles={{
                            label: {
                              backgroundColor: 'var(--mantine-color-violet-1)',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontWeight: 500
                            }
                          }}
                        />
                      </Group>
                      <Select
                        data={sortOptions}
                        value={sort}
                        onChange={(value) => setSort(value ?? 'new')}
                        label="ソート"
                        size="md"
                        style={{ minWidth: 180 }}
                      />
                    </Group>
                  </Group>
                  <Grid>
                    {filteredAndSortedArticles.map((article) => (
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
      <footer style={{ marginTop: 48, textAlign: 'center', color: '#888', fontSize: 14 }}>
        ※このページはZenn公式のものではありません．
        <br />
        designed by <a href="https://github.com/Hiromu-USHIHARA">Hiromu Ushihara</a>
      </footer>
    </Container>
  );
}

export default App;

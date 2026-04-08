import ContentListView from '@/components/admin/ContentListView'

export default function DocsPage() {
  return (
    <ContentListView
      type="doc"
      title="Documentation"
      description="Product and API documentation"
      singularLabel="doc"
      backPath="/admin/content/docs"
    />
  )
}

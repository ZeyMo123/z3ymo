import ContentListView from '@/components/admin/ContentListView'

export default function GuidesPage() {
  return (
    <ContentListView
      type="guide"
      title="Guides"
      description="Step-by-step how-to guides for your users"
      singularLabel="guide"
      backPath="/admin/content/guides"
    />
  )
}

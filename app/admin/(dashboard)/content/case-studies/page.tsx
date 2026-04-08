import ContentListView from '@/components/admin/ContentListView'

export default function CaseStudiesPage() {
  return (
    <ContentListView
      type="case-study"
      title="Case studies"
      description="Client success stories and project outcomes"
      singularLabel="case study"
      backPath="/admin/content/case-studies"
    />
  )
}

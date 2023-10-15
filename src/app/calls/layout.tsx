import { PageWrapper } from '@/styles/layout.styles'

export default async function CallsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PageWrapper>{children}</PageWrapper>
}

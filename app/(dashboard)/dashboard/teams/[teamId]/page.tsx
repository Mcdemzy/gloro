import TeamDetailContent from "@/components/dashboard/TeamDetailContent";

interface PageProps {
  params: Promise<{ teamId: string }>;
  searchParams: Promise<{ edit?: string }>;
}

export default async function TeamDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { teamId } = await params;
  const { edit } = await searchParams;

  return <TeamDetailContent teamId={teamId} autoOpenEdit={edit === "1"} />;
}

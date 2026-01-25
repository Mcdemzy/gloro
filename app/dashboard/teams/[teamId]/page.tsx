import TeamDetailContent from "@/components/dashboard/TeamDetailContent";

interface TeamDetailPageProps {
  params: {
    teamId: string;
  };
}

export default function TeamDetailPage({ params }: TeamDetailPageProps) {
  return <TeamDetailContent teamId={params.teamId} />;
}
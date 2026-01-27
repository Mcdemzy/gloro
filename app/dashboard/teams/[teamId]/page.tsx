// components/dashboard/TeamDetailContent.tsx
interface TeamDetailContentProps {
  teamId: string;
}

export default function TeamDetailContent({ teamId }: TeamDetailContentProps) {
  // Your component logic here
  return (
    <div>
      <h1>Team Detail: {teamId}</h1>
      {/* ... rest of your component */}
    </div>
  );
}
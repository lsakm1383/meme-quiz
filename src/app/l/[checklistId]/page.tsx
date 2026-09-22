import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { checklists, getChecklist } from "@/data/checklists";
import { ChecklistRunner } from "@/components/ChecklistRunner";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return checklists.map((checklist) => ({ checklistId: checklist.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ checklistId: string }>;
}): Promise<Metadata> {
  const { checklistId } = await params;
  const checklist = getChecklist(checklistId);
  if (!checklist) return {};

  const title = `${checklist.emoji} ${checklist.title}`;
  return {
    title,
    description: checklist.description,
    openGraph: { title, description: checklist.description, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description: checklist.description,
    },
    alternates: { canonical: `${getSiteUrl()}/l/${checklist.id}` },
  };
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ checklistId: string }>;
}) {
  const { checklistId } = await params;
  const checklist = getChecklist(checklistId);
  if (!checklist) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center px-6 py-16">
      <ChecklistRunner checklist={checklist} />
    </div>
  );
}

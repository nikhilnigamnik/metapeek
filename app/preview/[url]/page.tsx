import { fetchMetadata } from "@/lib/get-metadata";
import PreviewClient from "./client";

export default async function PreviewPage({
  params,
}: Readonly<{
  params: { url: string };
}>) {
  const decodedUrl = decodeURIComponent(params.url);
  const data = await fetchMetadata(decodedUrl);

  if (!data) {
    return (
      <div className="text-center text-red-500">Failed to fetch metadata</div>
    );
  }

  return <PreviewClient data={data} url={decodedUrl} />;
}

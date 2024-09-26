"use client";

import React, { useState } from "react";
import { getCleanUrl } from "@/lib/get-clean-url";
import Link from "next/link";

interface DataType {
  ogUrl: string;
  twitterTitle: string;
  twitterImage: string;
  ogDescription: string;
  ogTitle: string;
  title: string;
  description: string;
  author: string;
  keywords: string;
  favicon?: string;
  schemaOrg?: string;
  ogImage?: string;
}

interface PreviewClientProps {
  data: DataType;
  url: string;
}

export default function PreviewClient({
  data,
  url,
}: Readonly<PreviewClientProps>) {
  const [activeTab, setActiveTab] = useState("whatsapp");
  const prettyUrl = getCleanUrl(url);

  const tabs = [
    { id: "whatsapp", name: "WhatsApp" },
    { id: "linkedin", name: "LinkedIn" },
    { id: "twitter", name: "Twitter" },
    { id: "discord", name: "Discord" },
  ];

  const tabContent: { [key: string]: JSX.Element } = {
    whatsapp: (
      <div className="p-1 rounded-lg bg-[#005c4b]">
        {data.ogImage && (
          <img
            src={data.ogImage}
            alt="OG Image"
            className="rounded-t-lg w-full"
          />
        )}
        <div className="p-2 bg-[#025144] rounded-b-lg">
          <h3 className="text-sm font-semibold text-neutral-200">
            {data.ogTitle || data.title}
          </h3>
          <p className="text-xs text-neutral-400">
            {data.ogDescription || data.description}
          </p>
          <p className="text-xs text-neutral-400">{prettyUrl}</p>
        </div>
        <p className="text-xs text-[#53bdeb] p-2">{data.ogUrl || url}</p>
      </div>
    ),
    linkedin: (
      <div className="rounded-lg border border-gray-200">
        {data.ogImage && (
          <img src={data.ogImage} alt="OG Image" className="w-full" />
        )}
        <div className="bg-[#38434f] p-2">
          <h3 className="text-sm font-semibold text-neutral-200">
            {data.ogTitle || data.title}
          </h3>
          <p className="text-xs text-neutral-400">{prettyUrl}</p>
        </div>
      </div>
    ),
    twitter: (
      <div>
        {data.twitterImage && (
          <div className="relative">
            <img
              src={data.twitterImage}
              alt="Twitter Image"
              className="rounded-xl"
            />
            <h3 className="text-neutral-200 absolute left-2 bottom-2 text-sm bg-black rounded p-1">
              {data.twitterTitle || data.title}
            </h3>
          </div>
        )}
        <p className="text-xs text-neutral-800 mt-1">From {prettyUrl}</p>
      </div>
    ),
    discord: (
      <div className="bg-[#2b2d31] p-4 rounded-lg shadow-md border-l-4 border-[#1e1f22]">
        <div className="flex flex-col gap-2 pb-3">
          <h3 className="text-xs text-white">{data.ogTitle || data.title}</h3>
          <h3 className="font-bold text-[#00a8fc]">
            {data.ogTitle || data.title}
          </h3>
          <p className="text-sm text-gray-300">
            {data.ogDescription || data.description}
          </p>
        </div>
        {data.ogImage && (
          <img src={data.ogImage} alt="OG Image" className="rounded w-full" />
        )}
      </div>
    ),
  };

  return (
    <div className="px-4 py-8">
      <Link href={"/"}>
        <button className="text-sm bg-neutral-950 text-neutral-200 px-3 py-1 rounded mb-4">
          Back
        </button>
      </Link>
      <h1 className="text-lg font-bold mb-6 md:text-xl">{url}</h1>

      <div className="mb-4">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`p-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.id
                  ? "border-b-2 border-emerald-700 text-emerald-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      {tabContent[activeTab] || null}
    </div>
  );
}

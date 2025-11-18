import { Hero } from "@/components/home/Hero";
import { History } from "@/components/home/History";
import { Collections } from "@/components/home/Collections";
import { Visit } from "@/components/home/Visit";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <History />
      <Collections />
      <Visit />
    </div>
  );
}

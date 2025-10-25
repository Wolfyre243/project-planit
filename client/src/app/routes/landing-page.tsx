import { MainNavBar } from "@/components/navigation/nav-bar";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'PlanIt' },
    { name: 'description', content: 'Plan it with PlanIt!' },
  ];
}

export default function Home() {
  return (
    <div className='flex h-screen min-h-screen w-full flex-col'>
      <MainNavBar />
      <section className="h-full w-full justify-center items-center flex flex-col">
        <h1 className="text-3xl font-semibold">Plan your day with PlanIt!</h1>
      </section>
    </div>
  );
}

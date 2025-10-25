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
      <h1>Hello world</h1>
    </div>
  );
}

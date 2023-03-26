import { SportsAPI } from "@/datasources/SportsAPI";

export default async function useSports() {
    const sports = (await (await fetch('/api/sport', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })).json())
    return sports.data;
}
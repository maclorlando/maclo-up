import IChallenge from "@/interfaces/IChallenge";
import ISport from "@/interfaces/ISport";
import { mockChallenges } from "@/mockdata/mockChallenges";
import { mockSports } from "@/mockdata/mockSports";
import { createContext } from "react";

export interface IMockData {
    sports: ISport[],
    challenges: IChallenge[]
}

const mockData = {
    sports: mockSports,
    challenges: mockChallenges
}

export const MockDataContext = createContext<IMockData>(mockData);

export const MockDataProvider = ({children}:{children: any}) => {
    return(
        <MockDataContext.Provider value={mockData}>{children}</MockDataContext.Provider>
    )
}
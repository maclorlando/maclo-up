import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates'
import { useState } from "react";
import ChallengeForm from "../ChallengeForm";
import SportForm from "../SportForm";

export default function CreateEntityModal({ type, closeCallback, sportsMutate, challengesMutate }: 
    { type: string, closeCallback: Function, sportsMutate: Function, challengesMutate: Function}) {

    return (
        <>
            <Stack bg={'none'} h={450}>
                {(type == 'challenge') ?
                    <>
                        <ChallengeForm closeCallback={closeCallback} challengesMutate={challengesMutate}></ChallengeForm>
                    </>

                    :
                    <>
                        <SportForm closeCallback={closeCallback} sportsMutate={sportsMutate}></SportForm>
                    </>}
            </Stack>
        </>
    )
}
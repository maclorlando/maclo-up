import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates'
import { useState } from "react";
import ChallengeForm from "../ChallengeForm";

export default function CreateEntityModal({ type, closeCallback }: { type: string, closeCallback: Function }) {

    return (
        <>
            <Stack bg={'none'} h={450}>
                {(type == 'challenge') ?
                <>
                    <ChallengeForm closeCallback={closeCallback}></ChallengeForm>
                </>

                    :
                    <>

                    </>}
            </Stack>
        </>
    )
}
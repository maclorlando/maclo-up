import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates'
import { useState } from "react";
import ChallengeForm from "../ChallengeForm";
import SportForm from "../SportForm";

export default function CreateEntityModal({ type, closeCallback, sportsMutate, challengesMutate, entityId }:
    { type: string, closeCallback: Function, sportsMutate: Function, challengesMutate: Function, entityId: string | undefined }) {

    return (
        (type.includes('Sport')) ?
            (<SportForm closeCallback={closeCallback} sportsMutate={sportsMutate}
                operation={type.includes('Create') ? 'create' : 'update'}
                sportId={entityId} />)
            :
            (<ChallengeForm closeCallback={closeCallback} challengesMutate={challengesMutate}
                operation={type.includes('Create') ? 'create' : 'update'}
                challengeId={entityId} />)
    )
}

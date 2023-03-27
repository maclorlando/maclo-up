import IChallenge from "@/interfaces/IChallenge";
import { Group, TextInput, NumberInput, Button, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";

export default function ChallengeForm({closeCallback, challengesMutate, operation, challengeId}:
    {closeCallback: Function, challengesMutate: Function, operation: string, challengeId: string | undefined}) {
    const [nameError, setNameError] = useState('');
    const [name, setName] = useState('')
    const [titleErr, setTitleErr] = useState('');
    const [title, setTitle] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');
    const [description, setDescription] = useState('');
    const [dateErr, setDateErr] = useState('');
    const [endDate, setEndDate] = useState('');
    const [prizeErr, setPrizeErr] = useState('');
    const [prize, setPrize] = useState<number>(0);
    const [maxParticipants, setMaxParticipants] = useState<number>();
    const [participants, setParticipants] = useState<number>(0);
    const [rules, setRules] = useState('');

    const validateForm = (): Boolean => {
        let result = true;
        if(!name) {
            setNameError('required');
            result = false;
        }
        if (!title) {
            setTitleErr('required');
            result = false;
        }
        if (!description) {
            setDescriptionErr('required');
            result = false;
        }
        if (!endDate) {
            setDateErr('required');
            result = false;
        }
        if (!prize) {
            setPrizeErr('required');
            result = false;
        }
        return result;
    }
    const validateUpdatePayload = (challengePayload: any) : Boolean => {
        if (challengePayload.hasOwnProperty('sport_name') ||
        challengePayload.hasOwnProperty('title') ||
        challengePayload.hasOwnProperty('description') ||
        challengePayload.hasOwnProperty('end_date') ||
        challengePayload.hasOwnProperty('prize_pool') ||
        challengePayload.hasOwnProperty('rules_description') ||
        challengePayload.hasOwnProperty('max_participants') ||
        challengePayload.hasOwnProperty('participants')) {
            return true
        } else {
            return false;
        }
    }
    const updateChallenge = async () => {
        let challengePayload: any = {};
        if (name) {challengePayload.sport_name = name}
        if (title) {challengePayload.title = title}
        if (description) {challengePayload.description = description}
        if (endDate) {challengePayload.end_date = endDate}
        if (prize) {challengePayload.prize_pool = prize}
        if (rules) {challengePayload.rules_description = rules}
        if (maxParticipants) {challengePayload.max_participants = maxParticipants}
        if (participants != 0) {challengePayload.participants = participants}

        if (validateUpdatePayload(challengePayload) && challengeId) {
            const updatedChallenge = (await (await fetch(`/api/challenge/${challengeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(challengePayload)
            })).json())
            return updatedChallenge;
        } else {
            return 'A valid update payload or challengeId was not provided.'
        }

    }
    const createChallenge = async () => {
        const newChallenge: IChallenge = {
            sport_name: name,
            title: title,
            description: description,
            participants: participants,
            prize_pool: prize,
            end_date: endDate
        }
        const challenge = (await (await fetch('/api/challenge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newChallenge)
          })).json())
        return challenge;
    }
    return (
        <Stack>
            <Group>
                <TextInput label={'Sport Name:'} placeholder={'sport name'}
                    error={nameError}
                    onChange={(e) => {
                        setName(e.currentTarget.value);
                        setNameError('');
                    }}></TextInput>
                <TextInput label={'Title:'} placeholder={'challenge title'}
                    error={titleErr}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                        setTitleErr('');
                    }}></TextInput>
                <TextInput label={'Description:'} placeholder={'challenge description'}
                    error={descriptionErr}
                    onChange={(e) => {
                        setDescription(e.currentTarget.value);
                        setDescriptionErr('');
                    }}></TextInput>
                <DateInput label={'End Date:'} placeholder={'challenge end date'}
                    minDate={new Date()}
                    error={dateErr}
                    onChange={(e) => {
                        if (e) {
                            const pickedDate = new Date(e);
                            setEndDate(pickedDate.toUTCString());
                            setDateErr('');
                        }
                    }}></DateInput>
                <NumberInput label={'Prize Pool:'} placeholder={'challenge prize pool'}
                    hideControls
                    error={prizeErr}
                    onChange={(e) => {
                        if (e) {
                            setPrize(e);
                            setPrizeErr('');
                        }
                    }}></NumberInput>
                <TextInput label={'Rules:'} placeholder={'challenge rules description'}
                    onChange={(e) => {
                        setRules(e.currentTarget.value)
                    }}></TextInput>
                <NumberInput label={'Active Participants'} placeholder={'active participants'} hideControls
                    onChange={(e) => {
                        if (e) {
                            setParticipants(e)
                        }
                    }}></NumberInput>
                <NumberInput label={'Max Participants:'} placeholder={'challenge participants limit'} hideControls
                    onChange={(e) => {
                        if (e) {
                            setMaxParticipants(e)
                        }
                    }}></NumberInput>
            </Group>
            <Button
                sx={{ borderStyle: 'solid', borderColor: '#F77F00', borderWidth: '2px', flexShrink: 0}}
                styles={(theme) => ({
                    root: { background: '#F77F00', ":hover": theme.fn.hover({ background: 'white', color: '#F77F00' }) }
                })}
                mt={'auto'}
                fullWidth
                onClick={async () => {
                    if (operation=='create') {
                        if (!validateForm()) {
                            return;
                        } else {
                            await createChallenge();
                            challengesMutate();
                        }
                    } else {
                        const result = await updateChallenge();
                        challengesMutate();
                    }
                    closeCallback();
                }}>{operation=='create'?`Create Challenge`:'Update Challenge'}</Button>
        </Stack>
    )
}
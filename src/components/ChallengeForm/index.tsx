import IChallenge from "@/interfaces/IChallenge";
import { Group, TextInput, NumberInput, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";

export default function ChallengeForm({closeCallback, challengesMutate}:{closeCallback: Function, challengesMutate: Function}) {
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
    const createChallenge = async () => {
        const newChallenge: IChallenge = {
            sport_name: name,
            title: title,
            description: description,
            participants: 0,
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
        <>
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
                <TextInput label={'Rules:'} placeholder={'challenge rules description'}></TextInput>
                <NumberInput label={'Max Participants:'} placeholder={'challenge participants limit'} hideControls></NumberInput>
            </Group>
            <Button
                sx={{ borderStyle: 'solid', borderColor: '#F77F00', borderWidth: '2px', flexShrink: 0}}
                styles={(theme) => ({
                    root: { background: '#F77F00', ":hover": theme.fn.hover({ background: 'white', color: '#F77F00' }) }
                })}
                mt={'auto'}
                fullWidth
                onClick={async () => {
                    if (!validateForm()) {
                        return;
                    }
                    await createChallenge();
                    challengesMutate();
                    closeCallback();
                }}>Create Challenge</Button>
        </>
    )
}
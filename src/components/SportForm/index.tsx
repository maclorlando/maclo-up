import ISport from "@/interfaces/ISport";
import { Group, TextInput, Text, Button, Switch, NumberInput, Stack } from "@mantine/core";
import { useState } from "react";

export default function SportForm({ closeCallback, sportsMutate, operation, sportId }:
        { closeCallback: Function, sportsMutate: Function, operation: string, sportId: string | undefined}) {
    const [nameError, setNameError] = useState('');
    const [name, setName] = useState('')
    const [descriptionErr, setDescriptionErr] = useState('');
    const [description, setDescription] = useState('');
    const [imageErr, setImageErr] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [checked, setChecked] = useState(false);
    const validateForm = (): Boolean => {
        let result = true;
        if (!name) {
            setNameError('required');
            result = false;
        }
        if (!description) {
            setDescriptionErr('required');
            result = false;
        }
        if (!imageUrl) {
            setImageErr('required');
            result = false;
        }
        return result;
    }
    const validateUpdatePayload = (sportPayload: any) : Boolean => {
        if (sportPayload.hasOwnProperty('name') ||
        sportPayload.hasOwnProperty('description') ||
        sportPayload.hasOwnProperty('new') ||
        sportPayload.hasOwnProperty('image_url')) {
            return true
        } else {
            return false;
        }
    }
    const updateSport = async () => {
        const sportPayload: any = {};
        if (name) {sportPayload.name = name}
        if (description) {sportPayload.description = description}
        if (checked != undefined) {sportPayload.new = checked}
        if (imageUrl) {sportPayload.image_url = imageUrl}
        if (validateUpdatePayload(sportPayload) && sportId) {
            const sport = (await (await fetch(`/api/sport/${sportId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sportPayload)
            })).json())
            return sport;
        } else {
            return 'A valid update payload or sportId was not provided'
        }
    }
    const createSport = async () => {
        const newSport: ISport = {
            name: name,
            description: description,
            new: checked,
            image_url: imageUrl
        }
        const sport = (await (await fetch('/api/sport', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSport)
          })).json())
        return sport;
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
                <TextInput label={'Description:'} placeholder={'sport description'}
                    error={descriptionErr}
                    onChange={(e) => {
                        setDescription(e.currentTarget.value);
                        setDescriptionErr('');
                    }}></TextInput>
                <TextInput label={'Image Url:'} placeholder={'provide an image url'}
                    error={imageErr}
                    onChange={(e) => {
                        setImageUrl(e.currentTarget.value);
                        setImageErr('');
                    }}>
                </TextInput>
                <Group>
                    <Text>New Sport:</Text>
                    <Switch
                        styles={{track: {background: 'gray'}}}
                        checked={checked} label={checked.toString()} onChange={(event) => setChecked(event.currentTarget.checked)} />
                </Group>
            </Group>
            <Button
                mt={'auto'}
                sx={{ borderStyle: 'solid', borderColor: '#F77F00', borderWidth: '2px', flexShrink: 0}}
                styles={(theme) => ({
                    root: { background: '#F77F00', ":hover": theme.fn.hover({ background: 'white', color: '#F77F00' }) }
                })}
                fullWidth
                onClick={async () => {
                    if (operation=='create') {
                        if (!validateForm()) {
                            return;
                        }
                        await createSport();
                        sportsMutate();
                    } else {
                        const result = await updateSport();
                        console.log(result);
                        sportsMutate();
                    }
                    closeCallback();
                }}>{operation=='create'?`Create Sport`:'Update Sport'}</Button>
        </Stack>
    )
}
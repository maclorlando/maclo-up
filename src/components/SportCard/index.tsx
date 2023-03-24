import ISport from "@/interfaces/ISport";
import { Card, Image, Group, Badge, Text, Button } from "@mantine/core";

export default function SportCard({ sport }: { sport: ISport }) {
    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder maw={350} bg={'#e9ecef'}
                sx={(theme) => (theme.fn.hover({ background: '#f8f9fa' }))}>
                <Card.Section>
                    <Image
                        src={sport.image_url}
                        height={160}
                        alt="sport-card-alt-text"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{sport.name}</Text>
                    <Group spacing={5}>
                        {sport.challenges ?
                            <Badge
                                styles={() => ({ root: { background: '#ced4da', color: '#F77F00' } })}>
                                {`${sport.challenges} challenges`}
                            </Badge> : null}
                        {sport.new ?
                            <Badge
                                styles={() => ({ root: { background: '#bee9e8', color: '#1e6091' } })}>
                                New
                            </Badge> : null}
                    </Group>
                </Group>

                <Text size="sm" color="dimmed">
                    {sport.description}
                </Text>

                <Button
                    fullWidth
                    mt="md"
                    radius="md"
                    sx={{ borderStyle: 'solid', borderColor: '#F77F00', borderWidth: '2px', }}
                    styles={(theme) => ({ root: { background: '#F77F00', ":hover": theme.fn.hover({ background: 'white', color: '#F77F00' }) } })}>
                    Enter Challenges
                </Button>
            </Card>
        </>
    )
}
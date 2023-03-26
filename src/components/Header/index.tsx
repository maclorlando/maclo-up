import { Group, Image, Burger, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { MutableRefObject, useRef, useState } from "react";
import { Settings, Search, Mist, MessageCircle, Trash, Trophy, BrandOffice, Database } from 'tabler-icons-react';

export default function Header() {
    const [headerMenuOpen, setHeaderMenuOpen] = useState<boolean>(false);
    const router = useRouter();
    return (
        <>
            <Group
                noWrap
                sx={{ position: "fixed", zIndex: 99 }}
                bg={'#e9ecef'}
                h={70}
                w={'100%'}
                align={'center'}
                p={'1%'}>
                <Menu
                    opened={headerMenuOpen}
                    shadow="md"
                    width={350}
                    onClose={() => {
                        setHeaderMenuOpen(false);
                    }}
                    styles={{ dropdown: { width: '600px' } }}>
                    <Menu.Target>
                        <Burger
                            sx={{ zIndex: 2 }}
                            opened={headerMenuOpen} onClick={() => {
                                setHeaderMenuOpen(!headerMenuOpen)
                            }}></Burger>
                    </Menu.Target>

                    <Menu.Dropdown
                        mt={10}
                        bg={'#e9ecef'}>
                        <Menu.Label fz={18} fw={'bold'}
                            color={'dark'}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                setHeaderMenuOpen(false);
                                router.push('/')
                            }}>Upside
                        </Menu.Label>
                        <Menu.Item icon={<Mist size={14} />}>About</Menu.Item>
                        <Menu.Item icon={<Settings size={14} />} disabled>Account Settings</Menu.Item>
                        <Menu.Item icon={<Trophy size={14} />} disabled>My Challenges</Menu.Item>
                        <Menu.Item icon={<MessageCircle size={14} />} disabled>Messages</Menu.Item>
                        <Menu.Item icon={<BrandOffice size={14} />}>Careers</Menu.Item>
                        <Menu.Item icon={<Database size={14} />} onClick={() => {
                            router.push('/mongodemo')
                        }}>Mongo Demo</Menu.Item>
                    <Menu.Item
                        icon={<Search size={14} />}
                        rightSection={<Text size="xs" fw={'bold'}>⌘K</Text>}
                    >
                        Search
                    </Menu.Item>


                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item color="red" icon={<Trash size={14} />}>Delete my account</Menu.Item>
                </Menu.Dropdown>
            </Menu>

            <Image
                alt="upside_logo"
                sx={{ cursor: 'pointer', position: 'fixed', zIndex: 1 }}
                height={60} fit={'contain'} src={'/./upside_alpha.png'}
                onClick={() => {
                    router.push('/')
                }} />
        </Group>

        </>
    )
}
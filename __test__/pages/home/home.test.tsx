import Home from '@/pages'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Home', () => {
    it ('renders the IntroText and GamesTabs components', () => {
        const home = render(<Home sports={[]} challenges={[]}/>);
        const introText = home.container.getElementsByClassName('introText');
        const gamesTabs = home.container.getElementsByClassName('gamesTabs');
        expect(gamesTabs).toHaveLength(1);
        expect(introText).toHaveLength(1);
    })
})
import '@testing-library/jest-dom/extend-expect'
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

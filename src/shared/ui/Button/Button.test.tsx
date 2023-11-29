import { render, screen } from '@testing-library/react';

import { Button } from './Button';

import { ThemeButton } from '@/shared/const/buttonConsts';

describe('Button', () => {
    test('Test random text', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('Test clear theme', () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});

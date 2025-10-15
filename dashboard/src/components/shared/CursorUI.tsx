import {
    Cursor,
    CursorFollow,
    CursorProvider,
    type CursorFollowProps,
} from '@/components/animate-ui/components/animate/cursor';
import { ReactNode } from 'react';

interface CursorDemoProps {
    global?: boolean;
    enableCursor?: boolean;
    enableCursorFollow?: boolean;
    side?: CursorFollowProps['side'];
    sideOffset?: number;
    align?: CursorFollowProps['align'];
    alignOffset?: number;
    children: ReactNode
}

export const CursorDemo = ({
    global = false,
    enableCursor = true,
    enableCursorFollow = true,
    side = 'bottom',
    sideOffset = 15,
    align = 'end',
    alignOffset = 5,
    children
}: CursorDemoProps) => {
    return (
        <div
            key={String(global)}
            className="max-w-[100vw] h-[100vh] w-full bg-accent rounded-lg"
        >
            <CursorProvider global={global}>
                {enableCursor && <Cursor />}
                {enableCursorFollow && (
                    <CursorFollow
                        side={side}
                        sideOffset={sideOffset}
                        align={align}
                        alignOffset={alignOffset}
                        className='font-semibold text-fuchsia-700 bg-transparent'
                    >
                        Owner
                    </CursorFollow>
                )}
                {children}
            </CursorProvider>
        </div>
    );
};
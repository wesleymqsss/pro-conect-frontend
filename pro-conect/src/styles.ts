import { definePreset } from '@primeng/themes';
import  Aura  from '@primeng/themes/aura';

export const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{indigo.700}',
                    inverseColor: '#ffffff',
                    hoverColor: '{indigo.900}',
                    activeColor: '{indigo.500}'
                },
                highlight: {
                    background: '{indigo.950}',
                    focusBackground: '{indigo.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: '{indigo.600}',
                    inverseColor: '{indigo.500}',
                    hoverColor: '{indigo.100}',
                    activeColor: '{indigo.100}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
});
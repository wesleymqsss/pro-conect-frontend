import { definePreset } from '@primeng/themes';
import  Aura  from '@primeng/themes/aura';

export const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{rose.50}',
            100: '{rose.100}',
            200: '{rose.200}',
            300: '{rose.300}',
            400: '{rose.400}',
            500: '{rose.500}',
            600: '{rose.600}',
            700: '{rose.700}',
            800: '{rose.800}',
            900: '{rose.900}',
            950: '{rose.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{rose.700}',
                    inverseColor: '#ffffff',
                    hoverColor: '{rose.900}',
                    activeColor: '{rose.500}'
                },
                highlight: {
                    background: '{rose.950}',
                    focusBackground: '{rose.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: '{rose.600}',
                    inverseColor: '{rose.500}',
                    hoverColor: '{rose.100}',
                    activeColor: '{rose.100}'
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
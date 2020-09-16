function showLED(Level: number) {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            if (y < Level) {
                led.unplot(x, y)
            } else if (y == Level) {
                led.toggle(x, y)
            } else {
                led.plot(x, y)
            }
            
        }
    }
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    State = 1
    Time_Start = input.runningTime()
    Time_Target = 25 * ms_per_min
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    State = 2
    Time_Start = input.runningTime()
    Time_Target = 5 * ms_per_min
})
function End() {
    for (let index = 0; index < 5; index++) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . # . #
            # . . . #
            # # # # #
            `)
        basic.showLeds(`
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            `)
    }
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}

let Time_Delta = 0
let Time_Current = 0
let Time_Target = 0
let ms_per_min = 0
let Time_Start = 0
let State = 0
//  0 : standy
//  1 : Fucus
//  2 : Rest
State = 0
Time_Start = 0
ms_per_min = 2000
basic.forever(function on_forever() {
    
    basic.pause(500)
    while (true) {
        if (State == 0) {
            led.toggle(2, 2)
            break
        }
        
        Time_Current = input.runningTime()
        Time_Delta = Time_Current - Time_Start
        if (Time_Delta > Time_Target) {
            music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
            State = 0
            End()
        } else {
            showLED(Math.floor(Time_Delta / Time_Target * 5))
        }
        
        break
    }
})

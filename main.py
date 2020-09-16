def showLED(Level: number):
    for x in range(5):
        for y in range(5):
            if y < Level:
                led.unplot(x, y)
            elif y == Level:
                led.toggle(x, y)
            else:
                led.plot(x, y)

def on_button_pressed_a():
    global State, Time_Start, Time_Target
    State = 1
    Time_Start = input.running_time()
    Time_Target = 25 * ms_per_min
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global State, Time_Start, Time_Target
    State = 2
    Time_Start = input.running_time()
    Time_Target = 5 * ms_per_min
input.on_button_pressed(Button.B, on_button_pressed_b)

def End():
    for index in range(5):
        basic.show_leds("""
            # # # # #
            # . . . #
            # . # . #
            # . . . #
            # # # # #
            """)
        basic.show_leds("""
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            """)
    basic.show_leds("""
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        """)
Time_Delta = 0
Time_Current = 0
Time_Target = 0
ms_per_min = 0
Time_Start = 0
State = 0
# 0 : standy
# 1 : Fucus
# 2 : Rest
State = 0
Time_Start = 0
ms_per_min = 60000

def on_forever():
    global Time_Current, Time_Delta, State
    basic.pause(500)
    while True:
        if State == 0:
            led.toggle(2, 2)
            break
        Time_Current = input.running_time()
        Time_Delta = Time_Current - Time_Start
        if Time_Delta > Time_Target:
            music.start_melody(music.built_in_melody(Melodies.JUMP_UP), MelodyOptions.ONCE)
            State = 0
            End()
        else:
            showLED(Math.floor((Time_Delta / Time_Target)*5))
        break
basic.forever(on_forever)

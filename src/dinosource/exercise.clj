(ns dinosource.exercise
  (:require [dinosource.library :as library]))

(def exercises
  [{:title "Turn a pixel ON"
    :description ""
    :id 0
    :library (library/get-signatures :on)
    :script ["Welcome! Let's start programming, shall we? Most of the screen is taken by a grid of \"pixels\". A pixel is a square on the grid. Each pixel can be \"on\" or \"off\". All pixels are off, at the beginning"
             "Let's start by turning one pixel on. Drag the \"On\" block from the library (the leftmost column on the screen) into the code section (the middle column)."
             "Now fill in the first empty block of the \"On\" you just dragged with the number 5, and the second one with the number 7"
             "Now press the Play button (at the bottom of the code section) and see what happens!"]}

   {:title "Turn another pixel on"
    :description ""
    :id 1
    :library (library/get-signatures :on)
    :script ["Now, can you turn on a pixel at coordinates 6 and 10?"
             "If you have problems, go back to the previous exercise and see how it's done. It's the same thing, except we are now turning on a pixel at (6, 10), instead of (5, 7)"]}

   {:title "Turn several pixels on"
    :description ""
    :id 2
    :library (library/get-signatures :on)
    :script ["Turning a single pixel on does not accomplish much. So, let's start drawing several pixels together."
             "So, drag the On block from the library to the code section, and fill it with 1 and 2."
             "Now, drag On block again, place it below the one you dragged earlier, and fill it with 2 and 3."
             "As you can see, you can drag the same On block into the code section as many times as you want, and fill it with different numbers."
             "Now press Play and see what you've drawn."]}

   {:title "Turn a pixel OFF"
    :description ""
    :id 3
    :library (library/get-signatures :on :off)
    :script ["We can turn a pixel off as well. You'll see that there's a new block on the library, called \"Off\"."
             "But, to turn it off, we must first turn it on."
             "So, drag the blocks to turn two pixels on, the first one at (1, 2) and the second one at (5, 5)."
             "Now, drag an Off block below the ones you dragged earlier, and fill it with (1, 2). Drag an Off block again and fill it with (5, 5)."
             "Now press Play!"]}

     {:title "Blink a pixel"
      :description ""
      :id 4
      :library (library/get-signatures :on :off)
      :script ["Now that we can turn a pixel on and off, we can make pixels blink!"
               "So, drag the blocks to turn a pixel on at (3, 3) and then to turn it off. Then, do it again, two more times, always on the same position."
               "Press Play and watch that pixel blink!"]}

     {:title "Your own Blink block"
      :description ""
      :id 5
      :library (library/get-signatures :on :off :block)
      :script ["Blinking a pixel is fun, but repeating the same blocks over and over is not. What we really want is to give a name to \"turn this pixel on, then turn it off\", and just say that name when we want it to happen."
               "That means we're creating our own blocks, just like On and Off. So, let's create a block to blink a specific pixel. There is a new block on the library, called \"Block\". Drag it to the code section."
               "In the first empty space, fill in the name of the new block. For instance, \"Blink\". Now, drag the On block from the library into the body of your new block. Fill it in with a position, like the one from the previous exercise (3, 3). Finally, drag the Off block from the library into your new block, below the On one that you've just dragged, and fill it in with the same position."
               "Now, we have only created the block. To make it actually execute On and Off, we need to \"call\" it. Notice that your new Blink block appeared in the library. So drag it from the library into the code section."
               "Just like On and Off, you can call your Blink block as many times as you want. So, drag it a few times into the code section."
               "Now press Play, and watch your Blink block in action!"]}

   ])

(defn get-exercise
  ([] {:exercises (map #(select-keys % [:title :description :id]) exercises)})
  ([ex]
   (filter #(= (:id %) ex) exercises)))

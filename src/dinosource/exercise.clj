(ns dinosource.exercise
  (:require [dinosource.library :as library]))

(def exercises
  [{:title "Turn a pixel ON"
    :description ""
    :id 0
    :library (library/get-signatures :on)
    :script ["Welcome! Let's start programming, shall we? Most of the screen is taken by a grid of \"pixels\". A pixel is a square on the grid."
             "Each pixel can be \"on\" or \"off\". All pixels are off, at the beginning."
             "Let's start by turning one pixel on. Drag the \"On\" block from the library (the leftmost column on the screen) into the code section (the middle column)."
             "Now fill in the first empty block of the \"On\" you just dragged with the number 5, and the second one with the number 7"
             "Now press the Play button (at the bottom of the code section) and see what happens!"]
    :expected [{:name "on" :params ["5", "7"]}]}

   {:title "Turn another pixel on"
    :description ""
    :id 1
    :library (library/get-signatures :on)
    :script ["Now, can you turn on a pixel at coordinates 6 and 10?"
             "If you have problems, go back to the previous exercise and see how it's done. It's the same thing, except we are now turning on a pixel at (6, 10), instead of (5, 7)"]
    :expected [{:name "on"}]}

   {:title "Turn several pixels on"
    :description ""
    :id 2
    :library (library/get-signatures :on)
    :script ["Turning a single pixel on does not accomplish much. So, let's start drawing several pixels together."
             "So, drag the On block from the library to the code section, and fill it with 1 and 2."
             "Now, drag On block again, place it below the one you dragged earlier, and fill it with 2 and 3."
             "As you can see, you can drag the same On block into the code section as many times as you want, and fill it with different numbers."
             "Now press Play and see what you've drawn."]
    :expected [{:name "on"}]}

   {:title "Turn a pixel OFF"
    :description ""
    :id 3
    :library (library/get-signatures :on :off)
    :script ["We can turn a pixel off as well. You'll see that there's a new block on the library, called \"Off\"."
             "But, to turn it off, we must first turn it on."
             "So, drag the blocks to turn two pixels on, the first one at (1, 2) and the second one at (5, 5)."
             "Now, drag an Off block below the ones you dragged earlier, and fill it with (1, 2). Drag an Off block again and fill it with (5, 5)."
             "Now press Play!"]
    :expected [{:name "off"}]}

     {:title "Blink a pixel"
      :description ""
      :id 4
      :library (library/get-signatures :on :off)
      :script ["Now that we can turn a pixel on and off, we can make pixels blink!"
               "So, drag the blocks to turn a pixel on at (3, 3) and then to turn it off. Then, do it again, two more times, always on the same position."
               "Press Play and watch that pixel blink!"]}
    :expected [{:name "on"}
               {:name "off"}]

     {:title "Your own Blink block"
      :description ""
      :id 5
      :library (conj (vec (library/get-signatures :on :off))
                     ;;: For this exercise, we want the arity-2 version of "block", (i.e., name and body)
                     (library/get-signature :block 2))
      :script ["Blinking a pixel is fun, but repeating the same blocks over and over is not."
               "What we really want is to give a name to \"turn this pixel on, then turn it off\", and just say that name when we want it to happen."
               "That means creating our own blocks, just like On and Off."
               "So, let's create a block to blink a specific pixel. There is a new block on the library, called \"Block\". Drag it to the code section."
               "In the first empty space, fill in the name of the new block. For instance, \"Blink\"."
               "Now, drag the On block from the library into the body of your new block. Fill it in with a position, like the one from the previous exercise (3, 3)."
               "Finally, drag the Off block from the library into your new block, below the On that you've just dragged, and fill it in with the same position."
               "Now, we have only created the block. To make it actually execute On and Off, we need to \"execute\" it."
               "Notice that your new Blink block appeared in the library. So drag it from the library into the code section."
               "Just like On and Off, you can execute your Blink block as many times as you want. So, drag it a few times into the code section."
               "Now press Play, and watch your Blink block in action!"]}

     {:title "Smling and Blinking"
      :description ""
      :id 6
      :library (conj (vec (library/get-signatures :on :off)) (library/get-signature :block 2))
      :script ["Now we can create blocks to easily repeat tasks, like blinking a pixel. Let's put this to work and make a smiling face that blinks its eyes!"
               "So: drag blocks to turn on the pixels at (2, 4) and (2, 6) for the eyes."
               "Then, for the smile, turn on the pixels at (3, 3), (4, 4), (4, 5), (4, 6) and (3, 7)."
               "Finally, create two new Blocks (which you can call Blink Left and Blink Right, for example), like in the previous exercise, each one to blink one of the eyes."
               "Then drag Blink Left and Blink Right into the code section to make the eyes blink a few times."
               "If you're stuck or confused, take a look at the previous exercise, for creating a block and executing it."
               "Press Play!"]}

     {:title "A single block to Blink anywhere"
      :description ""
      :id 7
      :library (library/get-signatures :on :off :block)
      :script ["Great, we have a smiley that blinks!"
               "But Blink Left and Blink Right are basically the same thing. The only difference is the position where we turn the pixels On and Off."
               "We don't want to create two different blocks for this. We want to create a single block, \"Blink\", and say \"blink here\", \"now blink there\" and so on."
               "We can do this by passing \"parameters\" into the block. Just like we give a position to the \"On\" and \"Off\" blocks, we can tell our own Blink block that it needs a position, to be used when it's are executed."
               "Notice that \"Block\" on the library has changed since the previous exercise. It now has a space for \"parameters\"."
               "So, drag this new Block into the code section and give it a name (say, Blink)."
               "The parameters, just like for \"On\" and \"Off\", are the coordinates for the position where we want the pixel to blink."
               "You can call them anything, like \"A\" and \"B\", \"First\" and \"Second\". But let's just call them X and Y, the same names that \"On\" uses."
               "Finally, we need to define the body of the block. Start by draggin an \"On\" block into the \"body\" of your Blink block."
               "Now, instead of putting numbers in the new \"On\" block, like we did before, we can use the names that we chose as parameters: X and Y."
               "Do the same with an \"Off\" block."
               "Now, our Blink block turns a pixel on at (X, Y) and then turns it off. Let's execute it!"
               "You'll see that your Blink block, which got added to the library, has two spaces for parameters. Drag it into the code section, and fill with a position, like (1, 3)."
               "Now, drag it again, and fill in a different position, like (5, 6)."
               "When the first Blink block is executed, X will be 1 and Y will be 3, and the pixel at (1, 3) will blink."
               "Then, when the second Blink is executed, X will be 5 and Y will be 6, so that other pixel will now blink."
               "New press Play, and see your Blink block be executed with different parameters!"]}
   ])

(defn get-exercise
  ([] {:exercises (map #(select-keys % [:title :description :id]) exercises)})
  ([ex]
   (filter #(= (:id %) ex) exercises)))

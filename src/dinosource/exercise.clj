(ns dinosource.exercise
  (:require [dinosource.library :as library]))

(def exercises
  [{:title "Turn a pixel on"
    :description ""
    :id 0
    :library (library/get-signatures :on)
    :script ["Let's start by turning one pixel on. Drag the \"On\" block from the library (the leftmost column on the screen) into the code section (the middle column)."
             "Now fill in the first empty block of On with the number 5, and the second one with the number 7"
             "Now press the Play button (at the bottom of the code section) and see what happens!"]}
   {:title "Turn another pixel on"
    :description ""
    :id 1
    :library (library/get-signatures :on)
    :script ["Now, can you turn on a pixel at coordinates 6 and 10?"
             "If you have problems, go back to the previous exercise and see how it's done. It's the same thing, except we are now turning on a pixel at (6, 10), instead of (5, 7)"]}
   ])

(defn get-exercise
  ([] {:exercises (map #(select-keys % [:title :description :id]) exercises)})
  ([ex]
   (filter #(= (:id %) ex) exercises)))

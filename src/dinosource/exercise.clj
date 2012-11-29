(ns dinosource.exercise
  (:require [dinosource.library :as library]))

(def exercises
  [{:title "Turn a pixel on"
    :description ""
    :id 0
    :library (library/get-signatures :on)
    :script []}
   {:title "Exercise 2"
    :description "The second exercise"
    :id 1
    :library []
    :script []}
   ])

(defn get-exercise
  ([] {:exercises (map #(select-keys % [:title :description :id]) exercises)})
  ([ex]
   (filter #(= (:id %) ex) exercises)))

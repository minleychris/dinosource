(ns dinosource.exercise)

(def exercises
  [{:title "Exercise 1"
    :description "The first exercise"
    :id 0
    :library []
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

(ns dinosource.exercise)

(defn get-exercise
  ([] {:exercises [{:title "Exercise 1"
      	            :description "The first exercise"
                    :id 0}
                   {:title "Exercise 2"
                  	:description "The second exercise"
                  	:id 1}
                   ]})
  ([ex]
   (get (:exercises (dinosource.exercise/get-exercise)) ex)))

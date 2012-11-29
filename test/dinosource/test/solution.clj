(ns dinosource.test.solution
  (:use clojure.test 
        dinosource.solution))

(deftest test-process-solution
  (testing "just on"
    (let [code {:code [{:id :foo
                       	:function "on"
                        :params [1 2]}]}
          solution (process-solution code)
          step (first (:steps solution))]
      (is (= (:highlight step) [:foo]))
      (is (= (:changes step) [{:x 1
                               :y 2
                               :state :on}])))))
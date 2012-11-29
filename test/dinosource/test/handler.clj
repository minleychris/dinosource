(ns dinosource.test.handler
  (:use clojure.test
        ring.mock.request  
        dinosource.handler))

(comment (deftest test-app
  (testing "main route"
    (let [response (app (request :get "/"))]
      (is (= (:status response) 200))
      (is (= (:body response) "Hello World"))))

  (testing "not-found route"
    (let [response (app (request :get "/invalid"))]
      (is (= (:status response) 404))))))
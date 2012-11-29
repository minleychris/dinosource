(ns dinosource.test.handler
  (:use clojure.test
        ring.mock.request  
        dinosource.handler))

(deftest test-app
  (testing "solutions 1"
    (let [response (app (body (request :post "/solutions/1") "{
  \"code\": [
    {\"id\": \"foo\",
     \"function\": \"on\",
     \"params\": [1, 2]
    }
  ]
}"))]
      (is (= (:status response) 200))
      (is (= (slurp (:body response))
             "{\"steps\":[{\"highlight\":[\"foo\"],\"changes\":[{\"x\":1,\"y\":2,\"state\":\"on\"}]}]}")))))
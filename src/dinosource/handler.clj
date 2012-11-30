(ns dinosource.handler
  	(:use compojure.core
          dinosource.exercise
          dinosource.solution
          ring.util.response
          [ring.middleware.format-response :only [wrap-restful-response]])
  	(:require	[compojure.handler :as handler]
    	    	[compojure.route :as route]
             	[cheshire.core :as json]))


(defn json-parsing-middleware [app]
  (fn [req]
    (app (assoc req :body (json/parse-string (slurp (:body req)) true)))))


(defroutes app-routes
    (GET "/exercises" [] (response (get-exercise)))
    (GET "/exercises/:id" [id]
         (response (get-exercise (Integer. id))))
    (POST "/solutions/:id" {body :body params :params}
          (response (process-solution body (Integer. (:id params)))))
    (route/files "/")
  	(route/not-found "Not Found"))

(def app
  (->
   (handler/site app-routes)
   (wrap-restful-response)
   (json-parsing-middleware)))
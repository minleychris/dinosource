(ns dinosource.handler
  	(:use compojure.core
          dinosource.exercise
          ring.util.response
          [ring.middleware.format-response :only [wrap-restful-response]])
  	(:require	[compojure.handler :as handler]
    	    	[compojure.route :as route]
             	[clojure.data.json :as json]))

(defroutes app-routes
    (GET "/exercise" [] (response (get-exercise)))
    (GET "/exercise/:id" [id]
         (response (get-exercise (Integer. id))))
    (route/files "/")
  	(route/not-found "Not Found"))

(def app
	(->
    	(handler/site app-routes)
    	(wrap-restful-response)))
(ns dinosource.library)

(defn available-functions []
  ;; Returns a map of all public functions in the library namespace,
  ;; with their names converted to keywords.

  ;; FIXME: how can I refer to the containing namespace (dinosource.library)?
  ;; *ns* means the current namespace in runtime (e.g, #<Namespace user> in the repl)
  ;; FIXME: don't export available-functions, get-function etc
  (into {} (map #(vector (keyword (name (first %))) (nth % 1)) (seq (ns-publics 'dinosource.library)))))

(defn get-function [name]
  (name (available-functions)))

(defn get-params [function]
  (let [param-list (first (:arglists (meta function)))]
    (map #(hash-map :name %) param-list)))

(defn get-signature [function-name]
  (let [function (get-function function-name)]
    (if (nil? function)
      (throw (Exception. (str "Unknown function: " (name function-name))))
      ;; FIXME: :name or :function? We use one for exercise and another for code.
      {:name (name function-name)
       :params (get-params function)})))

(defn get-signatures [& functions-names]
  (map get-signature functions-names))

;;; Exported functions

(defn on [x y]
  [{:x x
    :y y
    :state :on}])

(defn off [x y]
  [{ :x x
    :y y
    :state :off}])

(defn block [name params body]
  )

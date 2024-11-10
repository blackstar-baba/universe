## 描述
rw lock
```
#[derive(Debug, Clone)]
pub struct AppState {
    pub conn: DatabaseConnection,
    pub root_path: PathBuf,
    pub workspace_path: PathBuf,
    pub user_id: Arc<RwLock<String>>,
}

pub fn set_user_id(state: &AppState, user_id: &str) -> Result<String, Error> {
    // try write
    let result =  state.user_id.try_write();
    if result.is_err() {
        return Err(anyhow!(result.err().unwrap().to_string()));
    }
    let mut exist_user_id = result.unwrap();
    *exist_user_id = user_id.to_string();
    Ok(exist_user_id.to_string())
}

pub fn get_user_id(state: &AppState) -> Result<String, Error> {
    let result = state.user_id.read();
    if result.is_err() {
        return Err(anyhow!(result.err().unwrap().to_string()));
    }
    return Ok(result.unwrap().clone())
}
```


## 链接




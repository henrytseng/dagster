from functools import cached_property

from dagster_dlift.project import DbtCloudCredentials, DBTCloudProjectEnvironment
from dagster_dlift.test.client_fake import DbtCloudClientFake


class DbtCloudProjectEnvironmentFake(DBTCloudProjectEnvironment):
    def __init__(
        self,
        project_id: int,
        environment_id: int,
        client: DbtCloudClientFake,
        credentials: DbtCloudCredentials,
    ):
        self._client = client
        super().__init__(
            project_id=project_id, environment_id=environment_id, credentials=credentials
        )

    @cached_property
    def client(self) -> DbtCloudClientFake:
        return self._client